<?php

namespace Claroline\CoreBundle\API\Serializer;

use Claroline\CoreBundle\Entity\Widget\Widget;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.widget")
 */
class WidgetSerializer
{
    public function getClass()
    {
        return 'Claroline\CoreBundle\Entity\Widget\Widget';
    }

    public function serialize(Widget $widget, array $options = [])
    {
        return [

        ];
    }

    public function deserialize($data, Widget $widget, array $options = [])
    {

        return $widget;
    }
}
