def process_event(data):
    if data.confidence < 0.7:
        return None
    
    if data.event_type == "fall_detected":
        return f"fall detected at {data.camera_id}"
    
    return f"Event {data.event_type} aats {data.camera_id}"