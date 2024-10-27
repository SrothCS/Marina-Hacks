import cv2
import mediapipe as mp
from cvzone.HandTrackingModule import HandDetector
import numpy as np
import math

cap = cv2.VideoCapture(0)
detector = HandDetector(maxHands=1)

offset = 20
img_size = 300

while True:
    success, img = cap.read()
    if not success:
        print("Failed to capture image")
        continue  # Skip the rest of the loop if image capture failed

    hands, img = detector.findHands(img)
    if hands:
        hand = hands[0]
        x, y, width, height = hand['bbox']

        img_white = np.ones((img_size, img_size, 3), np.uint8) * 255
        img_crop = img[y - offset:y + height + offset, x - offset:x + width + offset]

        # Check if the cropping is valid
        if img_crop.size == 0:
            print("Invalid crop, skipping frame")
            continue  # Skip this frame if the crop is invalid

        aspect_ratio = height / width
        if aspect_ratio > 1:
            k = img_size / height
            w_cal = math.ceil(k * width)

            img_resize = cv2.resize(img_crop, (w_cal, img_size))
            w_gap = math.ceil((img_size - w_cal) / 2)
            img_white[:, w_gap:w_cal + w_gap] = img_resize
        else:
            k = img_size / width
            h_cal = math.ceil(k * height)

            img_resize = cv2.resize(img_crop, (img_size, h_cal))
            h_gap = math.ceil((img_size - h_cal) / 2)
            img_white[h_gap:h_cal + h_gap, :] = img_resize
        
        cv2.imshow("ImageCrop", img_crop)
        cv2.imshow("ImageWhite", img_white)
        
    cv2.imshow("Image", img)
    
    if cv2.waitKey(1) & 0xFF == ord('q'):  # Press 'q' to exit the loop
        break

cap.release()
cv2.destroyAllWindows()