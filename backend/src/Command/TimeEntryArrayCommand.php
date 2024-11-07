<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use App\Entity\TimeEntry;

class TimeEntryArrayCommand extends Command
{
    protected static $defaultName = 'app:calculateProject';
    protected static $defaultDescription = 'Difference between started_at and end_at';
    protected $objectManager;

    protected function configure(): void
    {
        $this
            ->addArgument('project', InputArgument::REQUIRED, 'ID Записи для вычесления общего времени');
    }

    public function __construct(EntityManagerInterface $objectManager)
    {
        $this->objectManager = $objectManager;
        parent::__construct();
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $project_id = (int) $input->getArgument('project');
        $repository = $this->objectManager->getRepository(TimeEntry::class);
        $timeEntries = $repository->findBy(['project' => $project_id]);
        $timeByDay = [];

        foreach ($timeEntries as $e) {
            if ($e->getStartedAt() && $e->getEndAt()) {
                $startTimestamp = $e->getStartedAt()->getTimestamp();
                $endTimestamp = $e->getEndAt()->getTimestamp();
                $timeSpent = $endTimestamp - $startTimestamp;
                $date = $e->getStartedAt()->format('Y-m-d');
                $timeSpentInMinutes = $timeSpent / 60;
                if (!isset($timeByDay[$date])) {
                    $timeByDay[$date] = 0;
                }
                $timeByDay[$date] += $timeSpentInMinutes;
            } else {
                $output->writeln(sprintf(
                    'Запись с ID %d не имеет значения started_at или end_at и будет пропущена.',
                    $e->getId()
                ));
            }
        }
        foreach ($timeByDay as $date => $totalMinutes) {
            $output->writeln(sprintf(
                'Дата: %s, Общее время: %.2f минут',
                $date, $totalMinutes
            ));
        }

        return Command::SUCCESS;
    }
}
