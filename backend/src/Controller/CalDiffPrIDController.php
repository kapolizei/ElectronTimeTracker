<?php

namespace App\Controller;

use App\Repository\ProjectRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Service\CalDiffPrIDRunner;
class CalDiffPrIDController extends AbstractController
{
    private $commandRunner;

    public function __construct(CalDiffPrIDRunner $commandRunner)
    {
        $this->commandRunner = $commandRunner;
    }

    /**
     * @Route("/api/time/project/{project_id}", name="app_api_totaltime")
     */
    public function calculateByProjectId(int $project_id, ProjectRepository $projectRepository): Response
    {
        $project_title = $projectRepository->find($project_id)->getTitle();
        try {
            $output = $this->commandRunner->calculateByProjectId($project_id);

            $timeData = [];
            $totalMinutes = 0;

            preg_match_all('/Дата: (\d{4}-\d{2}-\d{2}), Общее время: (\d+(\.\d+)?) минут/', $output, $matches);

            if (isset($matches[1]) && isset($matches[2])) {
                foreach ($matches[1] as $index => $date) {
                    $minutes = (float)$matches[2][$index];
                    $totalMinutes += $minutes;
                    $timeData[] = [
                        'date' => $date,
                        'total_time' => $minutes . ' минут',
                    ];
                }
            } else {
                $timeData[] = [
                    'error' => 'Не удалось извлечь время для проекта'
                ];
            }
            return new JsonResponse([
                'project_id' => $project_id,
                'project_title' => $project_title,
                'time_data' => $timeData,
                'total_time' => $totalMinutes . ' минут', // Общее время
            ]);

        } catch (\Exception $e) {
            return new JsonResponse([
                'error' => 'Ошибка при расчете времени',
                'message' => $e->getMessage()
            ]);
        }
    }

}

