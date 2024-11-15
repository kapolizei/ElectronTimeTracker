<?php
namespace App\Controller;

use App\Entity\Project;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class NewProjectController extends AbstractController
{
    /**
     * @Route("/api/new_project", name="new_project", methods={"POST"})
     */
    public function NewProject(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $project = new Project();
        $project->setTitle($data['title']);

        $entityManager->persist($project);
        $entityManager->flush();

        return new JsonResponse('success');
    }
}