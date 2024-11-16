<?php
namespace App\Controller;
use App\Entity\Project;

use App\Service\Access;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ProjectController extends AbstractController
{
    /**
     * @Route("/api/project", name="app_api_project")
     */
    public function index(Access $access): Response
    {
        $user = $access->validateUserRequest();

        $projects = $user->getProjects()->toArray();

        $projectsArray = array_map(function (Project $project) {
            return $project->toArray();
        }, $projects);

        return new JsonResponse(['projects' => $projectsArray]);
    }

}