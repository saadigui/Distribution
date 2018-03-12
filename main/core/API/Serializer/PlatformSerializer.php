<?php

namespace Claroline\CoreBundle\API\Serializer;

use Claroline\CoreBundle\Entity\User;
use Claroline\CoreBundle\Library\Asset\Webpack;
use Claroline\CoreBundle\Library\Configuration\PlatformConfigurationHandler;
use Claroline\CoreBundle\Manager\VersionManager;
use JMS\DiExtraBundle\Annotation as DI;
use Symfony\Component\HttpFoundation\RequestStack;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

/**
 * @DI\Service("claroline.serializer.platform")
 */
class PlatformSerializer
{
    /** @var string */
    private $env;

    /** @var TokenStorageInterface */
    private $tokenStorage;

    /** @var RequestStack */
    private $requestStack;

    /** @var Webpack */
    private $webpack;

    /** @var PlatformConfigurationHandler */
    private $config;

    /** @var VersionManager */
    private $versionManager;

    /**
     * PlatformSerializer constructor.
     *
     * @DI\InjectParams({
     *     "env"            = @DI\Inject("%kernel.environment%"),
     *     "tokenStorage"   = @DI\Inject("security.token_storage"),
     *     "requestStack"   = @DI\Inject("request_stack"),
     *     "webpack"        = @DI\Inject("claroline.asset.webpack"),
     *     "config"         = @DI\Inject("claroline.config.platform_config_handler"),
     *     "versionManager" = @DI\Inject("claroline.manager.version_manager"),
     *     "userSerializer" = @DI\Inject("claroline.serializer.user")
     * })
     *
     * @param string                       $env,
     * @param TokenStorageInterface        $tokenStorage
     * @param RequestStack                 $requestStack
     * @param Webpack                      $webpack
     * @param PlatformConfigurationHandler $config
     * @param VersionManager               $versionManager
     */
    public function __construct(
        $env,
        TokenStorageInterface $tokenStorage,
        RequestStack $requestStack,
        Webpack $webpack,
        PlatformConfigurationHandler $config,
        VersionManager $versionManager
    ) {
        $this->env = $env;
        $this->tokenStorage = $tokenStorage;
        $this->requestStack = $requestStack;
        $this->webpack = $webpack;
        $this->config = $config;
        $this->versionManager = $versionManager;
    }

    /**
     * Serializes required information for FrontEnd rendering.
     */
    public function serialize()
    {
        $request = $this->requestStack->getCurrentRequest();
        
        $currentUser = null;
        if (!empty($this->tokenStorage->getToken())) {
            $currentUser = $this->tokenStorage->getToken()->getUser();
        }

        // retrieve the current platform locale
        $locale = $this->config->getParameter('locale_language');
        if ($currentUser instanceof User) {
            // Get the locale for the logged user
            $locale = $currentUser->getLocale();
        } elseif (!empty($this->config->getParameter('locales')) && array_key_exists($request->getLocale(), $this->config->getParameter('locales'))) {
            // The current request locale is implemented so we use it
            $locale = $request->getLocale();
        }

        return [
            'name' => $this->config->getParameter('name'),
            'description' => null, // the one for the current locale
            'version' => $this->versionManager->getDistributionVersion(),
            'environment' => $this->env,
            'server' => [
                'protocol' => $request->isSecure() || $this->config->getParameter('theme') ? 'https' : 'http',
                'host' => $this->config->getParameter('domain_name') ? $this->config->getParameter('domain_name') : $request->getHost(),
            ],
            'theme' => [
                'name' => $this->config->getParameter('theme'),
                'main' => 'path_to_bootstrap',
            ],
            // exposes the current webpack build.
            // this is required to know which version to target with dynamic loading
            'assets' => $this->webpack->getAssets(),
            'locale' => [
                'current' => $locale,
                'available' => array_keys($this->config->getParameter('locales')),
            ],
            'openGraph' => [
                'enabled' => $this->config->getParameter('enable_opengraph'),
            ],
        ];
    }
}
