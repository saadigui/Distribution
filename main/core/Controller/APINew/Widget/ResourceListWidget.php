<?php

namespace Claroline\CoreBundle\Controller\APINew\Widget;

use Claroline\AppBundle\API\FinderProvider;
use Claroline\CoreBundle\Entity\Workspace\Workspace;
use JMS\DiExtraBundle\Annotation as DI;
use Sensio\Bundle\FrameworkExtraBundle\Configuration as EXT;
use Symfony\Component\HttpFoundation\Request;

/**
 * @EXT\Route("/widget/list/resource", options={"expose": true})
 */
class ResourceListWidget
{
    /** @var FinderProvider */
    private $finder;

    /**
     * ResourceListWidget constructor.
     *
     * @DI\InjectParams({
     *     "finder" = @DI\Inject("claroline.api.finder")
     * })
     *
     * @param FinderProvider $finder
     */
    public function __construct(FinderProvider $finder)
    {
        $this->finder = $finder;
    }

    /**
     * Lists the Resources inside a Desktop widget.
     *
     * @EXT\Route("", name="apiv2_widget_resource_list_desktop")
     *
     * @param Request $request
     *
     * @return array
     */
    public function listDesktopAction(Request $request)
    {
        return $this->finder->search(
            'Claroline\CoreBundle\Entity\Resource\ResourceNode',
            $request->query->all()
        );
    }

    /**
     * Lists the Resources inside a Workspace widget.
     *
     * @EXT\Route("/workspace/{id}", name="apiv2_widget_resource_list_ws")
     *
     * @param Request $request
     * @param Workspace $workspace
     *
     * @return array
     */
    public function listWorkspaceAction(Request $request, Workspace $workspace)
    {
        // limits the search to the current workspace
        $options = $request->query->all();
        $options['hiddenFilters']['workspace'] = $workspace->getId();

        return $this->finder->search(
            'Claroline\CoreBundle\Entity\Resource\ResourceNode',
            $options
        );
    }
}
