<?php

namespace Claroline\CoreBundle\API\Serializer;

use Claroline\CoreBundle\Entity\Widget\WidgetInstance;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.widget_instance")
 * @DI\Tag("claroline.serializer")
 */
class WidgetInstanceSerializer
{
    public function getClass()
    {
        return 'Claroline\CoreBundle\Entity\WidgetInstance';
    }

    public function serialize(WidgetInstance $widgetInstance, array $options = [])
    {
        return [
            'id' => $widgetInstance->getId(), // todo replace with UUID
            'title' => $widgetInstance->getName(),
            'type' => $widgetInstance->getWidget()->getName(),
            'display' => [

            ],
            'parameters' => [

            ]
        ];
    }

    public function deserialize($data, WidgetInstance $widgetInstance, array $options = [])
    {

        return $widgetInstance;
    }
}
