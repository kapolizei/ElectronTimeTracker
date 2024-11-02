<?php
// src/Command/CheckConnectionCommand.php

namespace App\Command;

use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

class CheckConnectionCommand extends Command
{
protected static $defaultName = 'app:check-connection';
private $entityManager;

public function __construct(EntityManagerInterface $entityManager)
{
parent::__construct();
$this->entityManager = $entityManager;
}

protected function configure()
{
$this->setDescription('Check database connection.');
}

protected function execute(InputInterface $input, OutputInterface $output)
{
try {
$connection = $this->entityManager->getConnection();
$connection->connect(); // Пробуем установить соединение
if ($connection->isConnected()) {
$output->writeln('Connected to the database successfully.');
}
} catch (\Exception $e) {
$output->writeln('Could not connect to the database: ' . $e->getMessage());
}

return Command::SUCCESS;
}
}
