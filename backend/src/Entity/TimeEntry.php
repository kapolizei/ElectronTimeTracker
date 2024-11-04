<?php

namespace App\Entity;

use App\Repository\TimeEntryRepository;
use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity(repositoryClass=TimeEntryRepository::class)
 */
class TimeEntry
{
    /**
     * @ORM\Id
     * @ORM\GeneratedValue
     * @ORM\Column(type="integer")
     */
    private $id;

    /**
     * @ORM\Column(type="datetime_immutable")
     */
    private $started_at;

    /**
     * @ORM\Column(type="datetime_immutable", nullable=true)
     */
    private $end_at;

    /**
     * @ORM\ManyToOne(targetEntity=Task::class, inversedBy="timeEntries")
     * @ORM\JoinColumn(nullable=false)
     */
    private $task;

    /**
     * @ORM\ManyToOne(targetEntity=User::class, inversedBy="timeEntries")
     * @ORM\JoinColumn(nullable=false)
     */
    private $user;

    /**
     * @ORM\ManyToOne(targetEntity=Project::class, inversedBy="timeEntries")
     * @ORM\JoinColumn(nullable=false)
     */
    private $project;

    public function setProject(?Project $project): self
    {
        $this->project = $project;
        return $this;
    }

    public function getProject(): ?Project
    {
        return $this->project;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getStartedAt(): ?\DateTimeImmutable
    {
        return $this->started_at;
    }

    public function setStartedAt(\DateTimeImmutable $started_at): self
    {
        $this->started_at = $started_at;

        return $this;
    }

    public function getEndAt(): ?\DateTimeImmutable
    {
        return $this->end_at;
    }

    public function setEndAt(?\DateTimeImmutable $end_at): self
    {
        $this->end_at = $end_at;

        return $this;
    }

    public function getTask(): ?Task
    {
        return $this->task;
    }

    public function setTask(Task $task): self
    {
        $this->task = $task;

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
    public function exportToArray(): array
    {
        return [
            'id' => $this->getId(),
            'task id'=>$this->getTask()->getId(),
            'user id' => $this->getUser()->getId(),
            'started at' => $this->getStartedAt()->format('Y-m-d H:i:s'),
            'end at' => $this->getEndAt()->format('Y-m-d H:i:s'),
            'project id' => $this->getProject()->getId(),
        ];
    }
}
