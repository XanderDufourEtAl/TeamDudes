import docker
import requests
import os

def grab_json_from_ncaa_api(container_name, api_route, destination_path,file_name):
    """
    Uses the ncaa-api-umaine Docker container to fetch JSON data from the NCAA API and saves it locally.

    :param container_name: Name of the Docker container running ncaa-api-umaine (our case relatively arbitrary).
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
        response = requests.get(api_url, verify=False)  # Disable SSL verification for local requests
        response.raise_for_status()  # Raise an error for HTTP errors
        
        os.makedirs(destination_path, exist_ok=True)  # Ensure the destination directory exists
        json_file_path = os.path.join(destination_path, (file_name +".json"))
        with open(json_file_path, "w") as f:
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

script_dir = os.path.dirname(__file__)  # Get the directory of the current script
destination_path = os.path.join(script_dir, "assets", "jsons")

# Example usage
grab_json_from_ncaa_api(
    container_name="ncaa-api",
    #api_route="/game/6384827",
    api_route="/schedule/icehockey-men/d1/2025/03",
    destination_path=destination_path,
    file_name="HockeySchedule202503"
)
