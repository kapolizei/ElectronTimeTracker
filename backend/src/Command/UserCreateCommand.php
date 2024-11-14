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
    protected static $defaultName = 'create:user';
    protected static $defaultDescription = 'Create a new user';
    protected $objectManager;


    protected function configure(): void
    {
        $this
            ->addArgument('username', InputArgument::REQUIRED, 'Username')
            ->addArgument('password', InputArgument::REQUIRED, 'Password')
            ->addArgument('email', InputArgument::REQUIRED, 'Email');
    }

    public function __construct(EntityManagerInterface $objectManager)
    {
        $this->objectManager = $objectManager;
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $password = $input->getArgument('password');
        $hash = md5($password);
        $user = new User();
        $user
       ->setLogin($login = $input->getArgument('username'))
            ->setPasswordHash(md5($hash))
            ->setEmail($email = $input->getArgument('email'));

        $this->objectManager->persist($user);
        $this->objectManager->flush();

        $output->writeln(sprintf('Created user: Login:<info>%s</info>, Password:<info>%s</info>,  Email:<info>%s</info>.', $login, $hash, $email));

        return Command::SUCCESS;
    }
}
