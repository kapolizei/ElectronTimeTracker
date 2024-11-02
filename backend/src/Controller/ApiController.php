<?php

namespace App\Controller;

use App\Entity\User;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class ApiController extends AbstractController
{
    /**
     * @Route("/api/user/{id}", name="app_api")
     */
    public function index($id, EntityManagerInterface $objectManager): Response
    {
        $user = $objectManager->getRepository(User::class)->find($id);
        return new JsonResponse(['user'=>$user->exportToArray()]);
    }
}
