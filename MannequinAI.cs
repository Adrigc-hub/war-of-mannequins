using UnityEngine;
using UnityEngine.AI;

public class MannequinAI : MonoBehaviour {
    public Transform target;
    private NavMeshAgent agent;

    void Start() {
        agent = GetComponent<NavMeshAgent>();
    }

    void Update() {
        Vector3 viewPos = Camera.main.WorldToViewportPoint(transform.position);
        bool isVisible = viewPos.z > 0 && viewPos.x > 0 && viewPos.x < 1 && viewPos.y > 0 && viewPos.y < 1;

        if (isVisible) {
            agent.isStopped = true;
        } else {
            agent.isStopped = false;
            agent.SetDestination(target.position);
        }
    }
}
