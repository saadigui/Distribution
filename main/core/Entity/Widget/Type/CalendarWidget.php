<?php

namespace Claroline\CoreBundle\Entity\Widget\Type;

use Doctrine\ORM\Mapping as ORM;

/**
 * @ORM\Entity()
 * @ORM\Table(name="claro_widget_calendar")
 */
class CalendarWidget
{
    /**
     * An unique identifier for the widget.
     *
     * @ORM\Id()
     * @ORM\Column(type="integer")
     * @ORM\GeneratedValue(strategy="AUTO")
     *
     * @var int
     */
    private $id;

    /**
     * The events to display in the calendar.
     *
     * @ORM\Column(type="json_array")
     *
     * @var string
     */
    private $events = [];

    /**
     * Get id.
     *
     * @return int
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Get events.
     *
     * @return string
     */
    public function getEvents()
    {
        return $this->events;
    }

    /**
     * Set events.
     *
     * @param array $events
     */
    public function setEvents(array $events)
    {
        $this->events = $events;
    }
}
