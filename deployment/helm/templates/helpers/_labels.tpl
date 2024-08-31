{{- define "common.labels" }}
  labels:
    version: {{ .Values.dockerImageVersion }}
{{- end }}
