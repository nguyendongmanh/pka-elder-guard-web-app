def process_event(data):
    if data.confidence < 0.7:
        return None
    
    if data.event_type == "fall_detected":   #phát hiện té ngã
        return f"fall detected at {data.camera_id}"
    
    if data.event_type == "violence_detected": #phát hiện bạo lực
        return f"violence detected at {data.camera_id}"
    
    if data.event_type == "imobile_detected": #phát hiện bất động
        return f"imobile detected at {data.camera_id}"
    
    return f"Event {data.event_type} aats {data.camera_id}"

