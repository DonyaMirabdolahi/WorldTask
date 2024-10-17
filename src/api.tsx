export const register = async (email: string, password: string): Promise<void> => {
    const response = await fetch('http://localhost:3000/users', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
        throw new Error(await response.text());
    }
};

export const login = async (email: string, password: string): Promise<void> => {
    const response = await fetch(`http://localhost:3000/users?email=${email}&password=${password}`);
    const users: Array<{ id: string; email: string; password: string }> = await response.json();

    if (users.length === 0) {
        throw new Error('Invalid email or password');
    }
};
