import docker
import os
import requests

def grab_json_from_ncaa_api(container_name, api_route, destination_path):
    """
    Uses the ncaa-api-umaine Docker container to fetch JSON data from the NCAA API and saves it locally.

    :param container_name: Name of the Docker container running ncaa-api-umaine.
    :param api_route: API route to fetch JSON data (e.g., "/scoreboard/football/fbs/2023/13/all-conf").
    :param destination_path: Path on the host to save the JSON file.
    """
    client = docker.from_env()
    try:
        # Check if the container exists
        try:
            container = client.containers.get(container_name)
            if container.status != "running":
                container.start()
        except docker.errors.NotFound:
            # Pull the image and create the container if it doesn't exist
            print(f"Container {container_name} not found. Pulling image and creating container...")
            image_name = "henrygd/ncaa-api"  # Replace with the correct image name if different
            client.images.pull(image_name)
            container = client.containers.run(
                image_name,
                name=container_name,
                detach=True,
                ports={"3000/tcp": 3000}
            )

        # Construct the API URL
        api_url = f"http://localhost:3000{api_route}"
        print(f"Fetching data from {api_url}...")

        # Make the GET request
        response = requests.get(api_url)
        response.raise_for_status()  # Raise an error for HTTP errors

        # Save the JSON data to the specified file
        json_file_path = os.path.join(destination_path, "data.json")
        with open(json_file_path, "w", encoding="utf-8") as f:
            f.write(response.text)
    except Exception as e:
        print(f"An error occurred: {e}")
    finally:
        # Stop and remove the container if it was started by this script
        try:
            container = client.containers.get(container_name)
            if container.status == "running":
                container.stop()
        except docker.errors.NotFound:
            pass
        client.close()

# Example usage
grab_json_from_ncaa_api(
    container_name="ncaa-api-container",
    api_route="/scoreboard/football/fbs/2023/13/all-conf",
    destination_path="C:/Users/frizz/Downloads"
)