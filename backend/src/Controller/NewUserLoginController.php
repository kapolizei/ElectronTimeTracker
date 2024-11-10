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

class NewUserLoginController extends AbstractController
{
    /**
     * @Route("/api/set_user/{username}", name="app_api_setUserName")
     */
    public function index(string $username, EntityManagerInterface $entityManager): Response
    {
        $user = new User();
        $user->setLogin($username);

        $entityManager->persist($user);
        $entityManager->flush();

        return new JsonResponse(['status' => 'User created', 'username' => $username], Response::HTTP_CREATED);
    }
}