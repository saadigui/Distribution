<?php

namespace Claroline\CoreBundle\API\Serializer;

use Claroline\CoreBundle\Entity\Widget\Type\SimpleWidget;
use JMS\DiExtraBundle\Annotation as DI;

/**
 * @DI\Service("claroline.serializer.widget_simple")
 * @DI\Tag("claroline.serializer")
 */
class SimpleWidgetSerializer
{
    public function getClass()
    {
        return 'Claroline\CoreBundle\Entity\Widget\Types\SimpleWidget';
    }

    public function serialize(SimpleWidget $widget, array $options = [])
    {
        return [
            //'fetchUrl' => $widget->getFetchUrl(),
            'filterable' => $widget->isFilterable(),
            'sortable' => $widget->isSortable(),
            'paginated' => $widget->isPaginated(),
            'pageSize' => $widget->getPageSize(),
            'defaultFilters' => $widget->getDefaultFilters(),
            'availableColumns' => $widget->getAvailableColumns(),
        ];
    }

    public function deserialize($data, SimpleWidget $widget, array $options = [])
    {

        return $widget;
    }
}
