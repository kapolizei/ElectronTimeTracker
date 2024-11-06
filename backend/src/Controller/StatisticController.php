<?php

namespace App\Controller;

use App\Entity\Project;
use App\Service\CalculateDifferenceRunner;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ProjectRepository;

class StatisticController extends AbstractController
{
    private $commandRunner;

    public function __construct(CalculateDifferenceRunner $commandRunner)
    {
        $this->commandRunner = $commandRunner;
    }
    /**
     * @Route("/api/project/{id}/statistic", name="get_project_statistic")
     */
    public function index($id, ProjectRepository $projectRepository): Response
    {
        $project = $projectRepository->find($id);
        $projectData = $project->reactStatisticArray();

        $output = $this->commandRunner->runCalculateCommand($id);
        if (preg_match('/Общее время (\d+) минут/', $output, $matches)) {
            $formattedTime = $matches[1];
        } else {
            $formattedTime = 'Не удалось получить время';
        }

        return new JsonResponse([
            "TotalTime" => $formattedTime,
            "project with id:${id}" => $projectData,

            ]);
    }
}