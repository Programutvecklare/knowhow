type Challenge = {
    id: number;
    title: string;
    description: string;
    level: number;
    createdAt: Date;
    updatedAt: Date;
    userId: string | null;
    boilerplate: string | null;
    tips: string | null;
    tests: string;
    submission: { passed: boolean }[];
}

type TestCase = {
    description: string;
    fn: () => void;
};

type TestResult = {
    description: string;
    passed: boolean;
    error?: string;
};

type Primitive = string | number | boolean | null | undefined;
type Comparable = Primitive | { [key: string]: Comparable } | Array<Comparable>;

type Submission = {
    id: string;
    userId: string;
    challengeId: number;
    code: string;
    passed: boolean;
    createdAt: Date;
    updatedAt: Date;
}