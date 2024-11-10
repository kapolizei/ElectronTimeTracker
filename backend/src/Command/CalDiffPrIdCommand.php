<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Entity\TimeEntry;

class CalDiffPrIdCommand extends Command
{
    protected static $defaultName = 'app:calculateDifIdProject';
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

        $timeEntries = $repository->findBy(['project'=>$project_id]);
        $totalTime = 0; // Seconds

        foreach ($timeEntries as $e) {
            if ($e->getStartedAt() && $e->getEndAt()) {
                $startTimestamp = $e->getStartedAt()->getTimestamp();
                $endTimestamp = $e->getEndAt()->getTimestamp();
                $totalTime += $endTimestamp - $startTimestamp;

                $output->writeln(sprintf(
                    'Дата: %s, Общее время: %.2f минут',
                    $e->getStartedAt()->format('Y-m-d'), // Используем формат даты
                    ($endTimestamp - $startTimestamp) / 60 // Конвертируем в минуты
                ));

            } else {
                $output->writeln(sprintf(
                    'Запись с ID %d не имеет значения started_at или end_at и будет пропущена.',
                    $e->getId()
                ));
            }
        }

        $formatedTime = round($totalTime / 60, 2); // Minutes


        // Выводим результат
        $output->writeln(sprintf(
            'Общее время для всех записей с project_id %d составляет: %d секунд. Общее время %d минут.Secs- %d',
            $project_id, $totalTime, $formatedTime, $totalTime
        ));
        return Command::SUCCESS;
    }
}

