<?php

namespace Claroline\CoreBundle\API\Serializer;

use Claroline\AppBundle\API\SerializerProvider;
use Claroline\AppBundle\Persistence\ObjectManager;
use Claroline\CoreBundle\Entity\Widget\WidgetInstance;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.widget_instance")
 * @DI\Tag("claroline.serializer")
 */
class WidgetInstanceSerializer
{
    /** @var ObjectManager */
    private $om;

    /** @var SerializerProvider */
    private $serializer;

    /**
     * WidgetInstanceSerializer constructor.
     *
     * @DI\InjectParams({
     *     "om"         = @DI\Inject("claroline.persistence.object_manager"),
     *     "serializer" = @DI\Inject("claroline.api.serializer")
     * })
     *
     * @param ObjectManager      $om
     * @param SerializerProvider $serializer
     */
    public function __construct(
        ObjectManager $om,
        SerializerProvider $serializer)
    {
        $this->om = $om;
        $this->serializer = $serializer;
    }

    public function getClass()
    {
        return 'Claroline\CoreBundle\Entity\WidgetInstance';
    }

    public function serialize(WidgetInstance $widgetInstance, array $options = [])
    {
        $widget = $widgetInstance->getWidget();

        // retrieves the custom configuration of the widget if any
        $parameters = [];
        if (!empty($widget->getClass())) {
            // loads configuration entity for the current instance
            $typeParameters = $this->om
                ->getRepository($widget->getClass())
                ->findOneBy(['widgetInstance' => $widgetInstance]);

            if ($typeParameters) {
                // serializes custom configuration
                $parameters = $this->serializer->serialize($typeParameters, $options);
            }
        }

        return [
            'id' => $widgetInstance->getId(), // todo replace with UUID
            'title' => $widgetInstance->getName(),
            'type' => $widget->getName(),
            'display' => [

            ],
            'parameters' => $parameters
        ];
    }

    public function deserialize($data, WidgetInstance $widgetInstance, array $options = [])
    {

        return $widgetInstance;
    }
}
