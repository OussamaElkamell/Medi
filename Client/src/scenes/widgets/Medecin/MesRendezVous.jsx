import React, { useState } from "react";
import { Calendar, List, Typography, Badge, Button, Modal, Form, Input, TimePicker } from "antd";
import dayjs from "dayjs";

const { Text, Title } = Typography;

const MesRendezVous = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [rendezvous, setRendezvous] = useState([
    {
      id: 1,
      date: "2024-06-10",
      time: "10:00 AM",
      patient: "Jean Dupont",
    },
    {
      id: 2,
      date: "2024-06-15",
      time: "02:00 PM",
      patient: "Marie Curie",
    },
    {
      id: 3,
      date: "2024-06-20",
      time: "11:00 AM",
      patient: "Ahmed Ben Ali",
    },
  ]);

  const [availabilities, setAvailabilities] = useState([
    {
      date: "2024-06-10",
      timeStart: "08:00 AM",
      timeEnd: "12:00 PM",
    },
    {
      date: "2024-06-15",
      timeStart: "01:00 PM",
      timeEnd: "05:00 PM",
    },
    {
      date: "2024-06-20",
      timeStart: "09:00 AM",
      timeEnd: "01:00 PM",
    },
  ]);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isAvailabilityModalVisible, setIsAvailabilityModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [availabilityForm] = Form.useForm();

  const dateCellRender = (value) => {
    const formattedDate = value.format("YYYY-MM-DD");
    const dailyAppointments = rendezvous.filter(
      (r) => r.date === formattedDate
    );

    const dailyAvailabilities = availabilities.filter(
      (a) => a.date === formattedDate
    );

    return (
      <ul className="events">
        {dailyAvailabilities.map((item, index) => (
          <li key={index}>
            <Badge status="processing" text={`Disponible: ${item.timeStart} - ${item.timeEnd}`} />
          </li>
        ))}
        {dailyAppointments.map((item) => (
          <li key={item.id}>
            <Badge status="success" text={`${item.time} - ${item.patient}`} />
          </li>
        ))}
      </ul>
    );
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
  };

  const selectedDateAppointments = rendezvous.filter(
    (r) => r.date === selectedDate.format("YYYY-MM-DD")
  );

  const selectedDateAvailabilities = availabilities.filter(
    (a) => a.date === selectedDate.format("YYYY-MM-DD")
  );

  const handleAddAppointment = () => {
    form.validateFields().then((values) => {
      const newAppointment = {
        id: rendezvous.length + 1,
        date: selectedDate.format("YYYY-MM-DD"),
        time: values.time.format("hh:mm A"),
        patient: values.patient,
      };
      setRendezvous([...rendezvous, newAppointment]);
      setIsModalVisible(false);
      form.resetFields();
    });
  };

  const handleAddAvailability = () => {
    availabilityForm.validateFields().then((values) => {
      const newAvailability = {
        date: selectedDate.format("YYYY-MM-DD"),
        timeStart: values.timeStart.format("hh:mm A"),
        timeEnd: values.timeEnd.format("hh:mm A"),
      };
      setAvailabilities([...availabilities, newAvailability]);
      setIsAvailabilityModalVisible(false);
      availabilityForm.resetFields();
    });
  };

  const handleDeleteAppointment = (id) => {
    setRendezvous(rendezvous.filter((item) => item.id !== id));
  };

  return (
    <div style={{ padding: "2rem" }}>
      <Title level={2}>Mes Rendez-vous</Title>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <div style={{ flex: "1 1 50%", marginRight: "2rem" }}>
          <Calendar
            dateCellRender={dateCellRender}
            onSelect={handleDateSelect}
          />
        </div>
        <div style={{ flex: "1 1 50%" }}>
          <Title level={3}>
            Rendez-vous et Disponibilités du {selectedDate.format("DD MMMM YYYY")}
          </Title>
          <List
            itemLayout="horizontal"
            dataSource={selectedDateAvailabilities.concat(selectedDateAppointments)}
            renderItem={(item) => (
              <List.Item
                actions={item.patient ? [
                  <Button
                    type="link"
                    onClick={() => handleDeleteAppointment(item.id)}
                  >
                    Supprimer
                  </Button>,
                ] : null}
              >
                <List.Item.Meta
                  title={<Text strong>{item.time}</Text>}
                  description={item.patient || `Disponible de ${item.timeStart} à ${item.timeEnd}`}
                />
              </List.Item>
            )}
          />
         
          <Button
            type="default"
            onClick={() => setIsAvailabilityModalVisible(true)}
            style={{ marginTop: "1rem" }}
          >
            Définir Disponibilité
          </Button>
        </div>
      </div>
      <Modal
        title="Ajouter un Rendez-vous"
        visible={isModalVisible}
        onOk={handleAddAppointment}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="patient"
            label="Nom du Patient"
            rules={[{ required: true, message: "Veuillez entrer le nom du patient" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="time"
            label="Heure du Rendez-vous"
            rules={[{ required: true, message: "Veuillez entrer l'heure du rendez-vous" }]}
          >
            <TimePicker format="hh:mm A" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Définir Disponibilité"
        visible={isAvailabilityModalVisible}
        onOk={handleAddAvailability}
        onCancel={() => setIsAvailabilityModalVisible(false)}
      >
        <Form form={availabilityForm} layout="vertical">
          <Form.Item
            name="timeStart"
            label="Heure de Début"
            rules={[{ required: true, message: "Veuillez entrer l'heure de début" }]}
          >
            <TimePicker format="hh:mm A" />
          </Form.Item>
          <Form.Item
            name="timeEnd"
            label="Heure de Fin"
            rules={[{ required: true, message: "Veuillez entrer l'heure de fin" }]}
          >
            <TimePicker format="hh:mm A" />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default MesRendezVous;
