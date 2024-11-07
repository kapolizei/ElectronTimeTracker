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

class CalDifCommand extends Command
{
    protected static $defaultName = 'app:calculate';
    protected static $defaultDescription = 'Difference between started_at and end_at';
    protected $objectManager;


    protected function configure(): void
    {
        $this
            ->addArgument('task', InputArgument::REQUIRED, 'ID Записи для вычесления общего времени');
    }

    public function __construct(EntityManagerInterface $objectManager)
    {
        $this->objectManager = $objectManager;
        parent::__construct();
    }

    public function execute(InputInterface $input, OutputInterface $output): int
    {
        $task = (int) $input->getArgument('task');
        $repository = $this->objectManager->getRepository(TimeEntry::class);

        $timeEntries = $repository->findBy(['task'=>$task]);
        $totalTime = 0;

       foreach ($timeEntries as $e) {
           if ($e->getStartedAt() && $e->getEndAt()) {
               $startTimestamp = $e->getStartedAt()->getTimestamp();
               $endTimestamp = $e->getEndAt()->getTimestamp();
               $totalTime += $endTimestamp - $startTimestamp;
           } else {
               $output->writeln(sprintf(
                   'Запись с ID %d не имеет значения started_at или end_at и будет пропущена.',
                    $e->getId()
               ));
           }
       }
        $formatedTime = $totalTime / 60;



        // Выводим результат
        $output->writeln(sprintf(
            'Общее время для всех записей с task %d составляет: %d секунд. Общее время %d минут',
            $task, $totalTime, $formatedTime
        ));
        return Command::SUCCESS;
    }
}

