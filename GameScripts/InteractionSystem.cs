using UnityEngine;

/// <summary>
/// Interface for any object the player can interact with (e.g., clues, doors).
/// </summary>
public interface IInteractable
{
    string GetInteractionPrompt();
    void Interact();
}

/// <summary>
/// Attach this to the Player Camera to handle looking at and interacting with objects.
/// </summary>
public class InteractionSystem : MonoBehaviour
{
    [Header("Interaction Settings")]
    public float interactionDistance = 3f;
    public LayerMask interactableLayer;
    
    // UI could be referenced here later to show prompts (e.g., "Press E to Inspect")
    // public TMPro.TextMeshProUGUI promptTextUI;

    private Camera playerCamera;

    void Start()
    {
        playerCamera = GetComponent<Camera>();
        if (playerCamera == null)
        {
            Debug.LogError("InteractionSystem must be attached to the Player Camera!");
        }
    }

    void Update()
    {
        HandleRaycast();
    }

    void HandleRaycast()
    {
        if (playerCamera == null) return;

        // Create a ray from the center of the screen
        Ray ray = new Ray(playerCamera.transform.position, playerCamera.transform.forward);
        RaycastHit hit;

        // Check if we hit something on the interactable layer within distance
        if (Physics.Raycast(ray, out hit, interactionDistance, interactableLayer))
        {
            // Check if the object has a component implementing IInteractable
            IInteractable interactable = hit.collider.GetComponent<IInteractable>();
            
            if (interactable != null)
            {
                // Here you would update UI to show the prompt
                // if (promptTextUI != null) promptTextUI.text = interactable.GetInteractionPrompt();

                // Check for input
                if (Input.GetKeyDown(KeyCode.E))
                {
                    interactable.Interact();
                }
            }
        }
        else
        {
            // Clear UI prompt if not looking at anything
            // if (promptTextUI != null) promptTextUI.text = "";
        }
    }
}
