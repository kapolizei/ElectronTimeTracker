<?php

namespace App\Command;

use App\Entity\Project;
use App\Entity\Task;
use App\Entity\TimeEntry;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use App\Entity\User;
class AddTimeEntryCommand extends Command
{
    protected static $defaultName = 'app:time-entry';
    protected static $defaultDescription = 'Time Entry Test Command';
    protected $objectManager;


    protected function configure(): void
    {
        $this
            ->addArgument('arg1', InputArgument::OPTIONAL, 'Argument description')
            ->addOption('option1', null, InputOption::VALUE_NONE, 'Option description');
    }

    public function __construct(EntityManagerInterface $objectManager)
    {
        $this->objectManager = $objectManager;
        parent::__construct();
    }
    private $entityManager;


    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $task1 = $this->objectManager->getRepository(Task::class)->find(1);
        $user = $this->objectManager->getRepository(User::class)->find(1);
        $project = $this->objectManager->getRepository(Project::class)->find(1);
        $timeEntry = new TimeEntry();
        $timeEntry
            ->setUser($user)
            ->setStartedAt(new \DateTimeImmutable('2024-11-07 18:57:36'))
            ->setEndAt(new \DateTimeImmutable('2024-11-07 20:05:53'))
            ->setProject($project)
            ->setTask($task1);
        $this->objectManager->persist($timeEntry);
        $this->objectManager->flush();

        // Выводим сообщение о результате
        $output->writeln('TimeEntry создан с задачей: ' . $task1->getTitle());
        $output->writeln('Проект найден: ' . $project->getTitle());

        return Command::SUCCESS;
    }
}