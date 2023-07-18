import { Response, Request } from "express";
import {
    createStudent,
    getAllStudents,
    getStudentById,
    updateStudentById,
    deleteStudentById,
} from "../services/students.service";

export const getStudents = async (req: Request, res: Response) => {
    const { data, error } = await getAllStudents();

    if (error) {
        res.status(500).json({ message: error });
    } else {
        res.status(200).json(data);
    }
};

export const getStudent = async (req: Request, res: Response) => {
    const idStudent = req.params.id;
    const { data, error } = await getStudentById(idStudent);

    if (error) {
        res.status(500).json({ message: error });
    } else if (!data[0]) {
        res.status(404).json({ message: "Not exist student" });
    } else {
        res.status(200).json(data[0]);
    }
};

export const newStudent = async (req: Request, res: Response) => {
    const { firstName, lastName, email } = req.body;
    const state = await createStudent(firstName, lastName, email);

    if (!state.error) {
        res.status(201).json({ message: "Created student" });
    } else {
        res.status(500).json({ message: state.error });
    }
};

export const updateStudent = async (req: Request, res: Response) => {
    const idStudent = req.params.id;
    const { firstName, lastName, email } = req.body;
    const { data: student } = await getStudentById(idStudent);

    if (!student[0]) {
        res.status(404).json({ message: "Not exist student to update" });
    }

    const infoUpdate = {
        firstName: firstName || student[0].firstName,
        lastName: lastName || student[0].lastName,
        email: email || student[0].email,
    };

    const state = await updateStudentById(infoUpdate, idStudent);

    if (!state.error) {
        res.status(201).json({ message: "Updated student" });
    } else {
        res.status(500).json({ message: state.error });
    }
};

export const deleteStudent = async (req: Request, res: Response) => {
    const idStudent = req.params.id;
    const state = await deleteStudentById(idStudent);

    if (!state.error) {
        res.status(201).json({ message: "Deleted student" });
    } else {
        res.status(500).json({ message: state.error });
    }
};
