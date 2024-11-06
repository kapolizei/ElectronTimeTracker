<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\CalculateDifferenceRunner;
class TotalTimeByTaskIdController extends AbstractController
{
    private $commandRunner;

    public function __construct(CalculateDifferenceRunner $commandRunner)
    {
        $this->commandRunner = $commandRunner;
    }
    /**
     * @Route("/api/time/{task_id}", name="app_api_totaltime")
     */
    public function calculateTime(int $task_id): Response
    {
        try {
            $output = $this->commandRunner->runCalculateCommand($task_id);
            if (preg_match('/Общее время (\d+) минут/', $output, $matches)) {
                $formattedTime = $matches[1];
            } else {
                $formattedTime = 'Не удалось получить время';
            }

            return new JsonResponse([
                'task_id' => $task_id,
                'minutes' => $formattedTime,
            ]);
        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Ошибка при расчете времени',
                'message' => $e->getMessage()
            ]);
        }
    }
}