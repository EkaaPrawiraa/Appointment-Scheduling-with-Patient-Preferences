from pymongo import MongoClient
from datetime import datetime


client = MongoClient("mongodb+srv://IRK12345678:IRK12345678@doctorschedule.et86c.mongodb.net/?retryWrites=true&w=majority&appName=DoctorSchedule")
db = client["DoctorSchedule"]

try:
    client.admin.command('ping')
    print("Pinged your deployment. You successfully connected to MongoDB!")
except Exception as e:
    print(e)


# Menambahkan doctor
doctor_collection = db["doctor"]
doctor_data = {
    "id_doctor": "D001",
    "nama_doctor": "Dr. John Doe",
    "time_slots": []  # Array kosong, akan diisi nanti
}
doctor_id = doctor_collection.insert_one(doctor_data).inserted_id

# Menambahkan time slot
time_slot_collection = db["time_slot"]
time_slot_data = [
    {
        "id_time_slot": "TS001",
        "time_start": datetime(2024, 8, 15, 9, 0),
        "time_start": datetime(2024, 8, 15, 10, 0),
        "id_doctor": "D001"
    },
    {
        "id_time_slot": "TS002",
        "time_start": datetime(2024, 8, 15, 10, 0),
        "time_start": datetime(2024, 8, 15, 11, 0),
        "id_doctor": "D001"
    }
]

# Menyimpan time slots dan mengupdate doctor
for slot in time_slot_data:
    time_slot_collection.insert_one(slot)
    doctor_collection.update_one(
        {"_id": doctor_id},
        {"$push": {"time_slots": slot["id_time_slot"]}}
    )
