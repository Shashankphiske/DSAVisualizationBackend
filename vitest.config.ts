import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        // Enables the HTML reporter for UI integration
        reporters: ['default', 'html'],
        coverage: {
            enabled: true,
            provider: 'v8', // or 'istanbul'
            reporter: ['text', 'json', 'html'],
            include: ['src/services/**/*.ts'], // Adjust to your service path
            exclude: ['node_modules/', 'src/test/'],
        },
    },
});
