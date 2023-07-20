import { Request, Response } from "express";
import {
    deleteCourseById,
    getAllCourses,
    getCourseById,
    newCourse,
    updateCourseById,
} from "../services/courses.service";

export const getCourses = async (req: Request, res: Response) => {
    const { data, error } = await getAllCourses();

    if (error) {
        res.status(500).json({ error });
    } else {
        res.status(200).json(data);
    }
};

export const getCourse = async (req: Request, res: Response) => {
    const idCourse = req.params.id;

    const { data: course, error } = await getCourseById(idCourse);

    if (error) {
        res.status(500).json({ error });
    } else if (!course[0]) {
        res.status(404).json({ message: "Not exist course" });
    } else {
        res.status(201).json(course);
    }
};

export const createCourse = async (req: Request, res: Response) => {
    const { nameCourse, descriptionCourse, numberOfVideos } = req.body;
    const state = await newCourse(
        nameCourse,
        descriptionCourse,
        numberOfVideos
    );

    if (!state.error) {
        res.status(201).json({ message: "Created course" });
    } else {
        res.status(500).json(state.error);
    }
};

export const updateCourse = async (req: Request, res: Response) => {
    const idCourse = req.params.id;
    const { nameCourse, descriptionCourse, numberOfVideos } = req.body;
    const { data: course } = await getCourseById(idCourse);

    if (!course[0]) {
        res.status(404).json({ message: "Not exist student to update" });
    }

    const infoUpdate = {
        nameCourse: nameCourse || course[0].nameCourse,
        descriptionCourse: descriptionCourse || course[0].descriptionCourse,
        numberOfVideos: numberOfVideos || course[0].numberOfVideos,
    };

    const state = await updateCourseById(infoUpdate, idCourse);

    if (!state.error) {
        res.status(201).json({ message: "Updated student" });
    } else {
        res.status(500).json({ message: state.error });
    }
};

export const deleteCourse = async (req: Request, res: Response) => {
    const idCourse = req.params.id;

    const state = await deleteCourseById(idCourse);

    if (!state.error) {
        res.status(200).json({ message: "Deleted course" });
    } else {
        res.status(500).json(state.error);
    }
};
