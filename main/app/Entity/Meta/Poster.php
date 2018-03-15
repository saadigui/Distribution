<?php

namespace Claroline\AppBundle\Entity\Meta;

use Doctrine\ORM\Mapping as ORM;

/**
 * Adds a poster image to an entity.
 */
trait Poster
{
    /**
     * The url to the poster image.
     *
     * @ORM\Column(name="poster", nullable=true)
     *
     * @var string
     */
    private $poster;

    /**
     * Get poster.
     *
     * @return string
     */
    public function getPoster()
    {
        return $this->poster;
    }

    /**
     * Set poster.
     *
     * @param string $poster
     */
    public function setPoster($poster)
    {
        $this->poster = $poster;
    }
}
