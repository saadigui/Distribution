<?php

namespace Claroline\CoreBundle\API\Serializer;

use Claroline\CoreBundle\Entity\Widget\WidgetInstance;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.widget_instance")
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

        ];
    }

    public function deserialize($data, WidgetInstance $widgetInstance, array $options = [])
    {

        return $widgetInstance;
    }
}
