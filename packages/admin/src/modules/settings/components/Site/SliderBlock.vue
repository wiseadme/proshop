<script lang="ts" setup>

    import { FormCard } from '@shared/components/FormCard'
</script>
<template>
    <form-card>
        <template #body>
            <iframe
                src="http://localhost:3001"
                frameborder="0"
                width="100%"
                height="650"
            />
        </template>
    </form-card>
</template>
