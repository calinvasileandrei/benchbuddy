export interface ExerciseListModel {
    name: string;
    force?: string;
    level: string;
    mechanic?: string;
    equipment?: string;
    instructions: string;
    category: string;
    primaryMuscles: string[];
    secondaryMuscles: string[];
}
