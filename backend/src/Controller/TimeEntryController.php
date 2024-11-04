<?php

namespace App\Controller;

use App\Repository\TimeEntryRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class TimeEntryController extends AbstractController
{
    /**
     * @Route("/api/task_entry", name="app_api_time_entry")
     */
    public function timeEntry(TimeEntryRepository $timeEntryRepository): Response
    {
        $timeEntry = $timeEntryRepository->findAllRecords();
        $data = array_map(function($timeEntry) {
            return $timeEntry->exportToArray();
        },$timeEntry);
        return new JsonResponse($data);

        //$data = [];
        //foreach ($timeEntry as $e) {
        //    $data[] = [
//                'id' => $e->getId(),
//                'task id' => $e->getTask()->getId(),
//                'user id' => $e->getUser()->getId(),
//                'started at' => $e->getStartedAt()->format('Y-m-d H:i:s'),
//                'completed at' => $e->getEndAt()->format('Y-m-d H:i:s'),
//                'project id' => $e->getProject()->getId(),
//            ];
//        }
//        return new JsonResponse($data);
    }
}