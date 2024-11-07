<?php
namespace App\Controller;

use App\Service\TimeEntryArrayRunner;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class TimeEntryArrayController extends AbstractController
{
private $commandRunner;

public function __construct(TimeEntryArrayRunner $commandRunner)
{
$this->commandRunner = $commandRunner;
}

/**
* @Route("/api/statistic/{project_id}", name="api_timeEntryArray")
*/
public function timeEntryArray(int $project_id): JsonResponse
{
$output = $this->commandRunner->timeEntryArray($project_id);

$pattern = '/Дата: (\d{4}-\d{2}-\d{2}), Общее время: (\d+(\.\d+)?) минут/';
preg_match_all($pattern, $output, $matches, PREG_SET_ORDER);

$data = [];
foreach ($matches as $match) {
$data[] = [
'date' => $match[1], // Дата
'total_time' => floatval($match[2]),
];
}
return new JsonResponse($data);
}
}
