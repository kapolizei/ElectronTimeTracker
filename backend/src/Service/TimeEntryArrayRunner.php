<?php

namespace App\Service;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class TimeEntryArrayRunner
{
    public function timeEntryArray(int $project_id): string
    {
        $command = ['php', __DIR__.'/../../bin/console', 'app:calculateProject', (string)$project_id];
        $process = new Process($command);
        $process->run();
        if (!$process->isSuccessful()) {
            throw new ProcessFailedException($process);
        }

        return $process->getOutput();
    }
}
