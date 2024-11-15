<?php

namespace App\Command;

use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class AddProjectCommand extends Command
{
    protected static $defaultName = 'create:project';
    protected static $defaultDescription = 'Create a new project';
    protected $objectManager;


    protected function configure(): void
    {
        $this
            ->addArgument('project', InputArgument::REQUIRED, 'Project name');
    }

    public function __construct(EntityManagerInterface $objectManager)
    {
        $this->objectManager = $objectManager;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $project = new Project();
        $project
            ->setTitle($input->getArgument('project'));

        $this->objectManager->persist($project);
        $this->objectManager->flush();

        $output->writeln(sprintf('New project: Title:<info>%s</info>', $project->getTitle()));

        return Command::SUCCESS;
    }
}
