# A DX/DevOps Pattern: bin/service

One pattern I like a lot is a `bin/service` wrapper. In each of your services (I like to call them [[Macro Service]] instead of [[Microservice]]).

The idea is to provide a few key things:

* Simple tools for developers to manage the service
* Lifecycle hooks for deployment
* All wrapped up in code, providing executable self-documentation

Imagine this:

```
Usage: bin/service <command>

Commands:
    system-setup          # Install machine dependencies (may require sudo)
    init                  # Initialize config files and the DB
    build                 # Build (rebuild) the image to get new deps
    start [service]       # Start up the app or a specific sub-service
    run [cmd] [args]      # Run a command in the 'web' sub-service
    stop                  # Stop the app
    status                # Get the app status

Deployment Commands:
    deploy <env>          # Deploys an environment using CI
    force-deploy <env>    # Deploys an environment using your machine

Database Commands:
    reset-db-from-staging # Download/restore from staging database
    reset-test-db         # Reset local test database (load schema/seed)
    db-snapshot <file>    # Use local psql to snapshot a DB dump to a local file
    db-restore <file>     # Use local psql to load a DB dump into the running db

Lifecycle Commands, used by Kubernetes/Helm:
    boostrap-job          # Entrypoint for bootstrap job
    start-web-pod         # Entrypoint for web pod
    start-worker-pod      # Entrypoint for starting the worker pod
    stop-worker-pod       # Entrypoint for stopping the worker pod
    upgrade-job           # Entrypoint for upgrade job
    build-assets          # Build step to compile assets prior to container build
    shell                 # Entrypoint for bash process (for a debugging pod)
```

These service-oriented commands don't really care what your internal-app tech stack is. But by standardizing the commands you can depend on them in a bunch of contexts. The most important is that you can run them both in your dev env, and then the lifecycle hooks can be part of a helm chart setup. You can have one generic chart that can manage any service that conforms to this general shape.

