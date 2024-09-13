{{/*значения переменных будут переданы из через контекст и переменную $data*/}}
{{- define "env.template" }}
- name: {{ .key }}
  valueFrom:
    secretKeyRef:
      name: {{ .role }}-secrets
      key: {{ .key }}
{{- end }}
