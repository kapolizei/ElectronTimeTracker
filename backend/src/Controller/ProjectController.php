<?php
namespace App\Controller;
use App\Entity\Project;

use App\Entity\User;
use App\Repository\ProjectRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProjectController extends AbstractController
{
    /**
     * @Route("/api/project", name="app_api_project")
     */
    public function index(ProjectRepository $projectRepository): Response
    {
        $projects = $projectRepository->findAll();

        $projectsArray = array_map(function (Project $project) {
            return $project->toArray();
        }, $projects);

        return new JsonResponse(['projects' => $projectsArray]);
    }

}