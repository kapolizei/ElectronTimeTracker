<?php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputArgument;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Input\InputOption;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Style\SymfonyStyle;
use App\Entity\User;

class UserCreateCommand extends Command
{
    protected static $defaultName = 'app:test';
    protected static $defaultDescription = 'Add a short description for your command';
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

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $user = new User();
       $user
       ->setLogin('test3')
            ->setEmail('test3@test.com')
            ->setPasswordHash(md5('test'));

        $this->objectManager->persist($user);
        $this->objectManager->flush();

        $user = $this->objectManager->getRepository(User::class)->findBy(['login' => 'test']);
        $output->writeln('This is a test command output!');

        return Command::SUCCESS;
    }
}
