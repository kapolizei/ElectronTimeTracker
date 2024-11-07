<?php
namespace App\Controller;

use App\Entity\Project;
use App\Entity\Task;
use App\Entity\TimeEntry;
use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Routing\Annotation\Route;

class SaveTimeEntryController extends AbstractController
{
    /**
     * @Route("/api/save_time_entry", name="save_time_entry", methods={"POST"})
     */
    public function SaveTimeEntryController(Request $request, EntityManagerInterface $entityManager): JsonResponse
    {
        $data = json_decode($request->getContent(), true);

        $project = $entityManager->getRepository(Project::class)->find($data['project_id']);
        $task = $entityManager->getRepository(Task::class)->find($data['task_id']);
        $user = $entityManager->getRepository(User::class)->find($data['user_id']);
    $timeEntry = new TimeEntry();
    $timeEntry->setUser($user);
    $timeEntry->setStartedAt(new \DateTimeImmutable($data['started_at']));
    $timeEntry->setEndAt(new \DateTimeImmutable($data['end_at']));
    $timeEntry->setTask($task);
    $timeEntry->setProject($project);
    $entityManager->persist($timeEntry);
    $entityManager->flush();

    return new JsonResponse('success');
    }
}