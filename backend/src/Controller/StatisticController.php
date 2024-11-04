<?php

namespace App\Controller;

use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Repository\ProjectRepository;

class StatisticController extends AbstractController
{
    /**
     * @Route("/api/project/{id}/statistic", name="get_project_statistic")
     */
    public function index($id, ProjectRepository $projectRepository): Response
    {
        $project = $projectRepository->find($id);
        $projectData = $project->reactStatisticArray();
        return new JsonResponse(["project with id:${id}" => $projectData]);
    }
}