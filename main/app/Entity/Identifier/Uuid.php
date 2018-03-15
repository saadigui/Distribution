<?php

namespace Claroline\AppBundle\Entity\Identifier;

use Doctrine\ORM\Mapping as ORM;
use Ramsey\Uuid\Uuid as BaseUuid;

/**
 * Adds an uuid to an entity.
 */
trait Uuid
{
    /**
     * @var string
     *
     * @ORM\Column(name="uuid", type="string", length=36, unique=true)
     */
    private $uuid;

    /**
     * Gets UUID.
     *
     * @return string
     */
    public function getUuid()
    {
        return $this->uuid;
    }

    /**
     * Sets UUID.
     *
     * @param $uuid
     */
    public function setUuid($uuid)
    {
        $this->uuid = $uuid;
    }

    /**
     * Generates a new UUID.
     */
    public function refreshUuid()
    {
        $this->uuid = BaseUuid::uuid4()->toString();
    }
}
