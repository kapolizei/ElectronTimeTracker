<?php

namespace App\Service;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class CalculateDifferenceRunner
{
public function runCalculateCommand(int $taskId): string
{
    $command = ['php', __DIR__.'/../../bin/console', 'app:calculate', (string)$taskId];

$process = new Process($command);
$process->run();

// Проверка успешности выполнения
if (!$process->isSuccessful()) {
throw new ProcessFailedException($process);
}

return $process->getOutput();
}
}
