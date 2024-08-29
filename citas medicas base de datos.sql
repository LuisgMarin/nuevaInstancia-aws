-- Set encoding
SET client_encoding = 'UTF8';

-- Set standard conforming strings
SET standard_conforming_strings = 'on';

-- Set search path
SELECT pg_catalog.set_config('search_path', '', false);

-- Create database agenda_wilson
CREATE DATABASE agenda_wilson WITH TEMPLATE = template0 ENCODING = 'UTF8' LC_COLLATE = 'C' LC_CTYPE = 'C';

-- Drop database agenda_wilson (use with caution)
-- DROP DATABASE agenda_wilson;

CREATE TABLE IF NOT EXISTS public.coll_citas_estados
(
    name character varying(2044) COLLATE pg_catalog."default",
    color character varying(2044) COLLATE pg_catalog."default",
    "createdAt" time with time zone,
    "updatedAt" time with time zone,
    id bigint NOT NULL
)

TABLESPACE pg_default;

ALTER TABLE IF EXISTS public.coll_citas_estados
    OWNER to postgres;

-- Create table coll_cita
CREATE TABLE public.coll_cita (
    id bigint NOT NULL,
    id_paciente bigint,
    id_especialista bigint,
    id_eps bigint,
    tipocita character varying(2044),
    fecha date,
    hora time with time zone,
    observacion character varying(2044),
    id_estado bigint,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_cita
-- DROP TABLE public.coll_cita;

-- Create sequence coll_cita_id_seq
CREATE SEQUENCE public.coll_cita_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_cita_id_seq
-- DROP SEQUENCE public.coll_cita_id_seq;

-- Set ownership of coll_cita_id_seq
ALTER SEQUENCE public.coll_cita_id_seq OWNED BY public.coll_cita.id;

-- Create table coll_cita_estados
CREATE TABLE public.coll_cita_estados (
    name character varying(2044),
    color character varying(2044),
    "createdAt" time with time zone,
    "updatedAt" time with time zone,
    id bigint NOT NULL
);

-- Drop table coll_cita_estados
-- DROP TABLE public.coll_cita_estados;

-- Create sequence coll_cita_estado_id_seq
CREATE SEQUENCE public.coll_cita_estado_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_cita_estado_id_seq
-- DROP SEQUENCE public.coll_cita_estado_id_seq;

-- Set ownership of coll_cita_estado_id_seq
ALTER SEQUENCE public.coll_cita_estado_id_seq OWNED BY public.coll_cita_estados.id;

-- Create table coll_config
CREATE TABLE public.coll_config (
    id bigint NOT NULL,
    value character varying(2044),
    name character varying(2044),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_config
-- DROP TABLE public.coll_config;

-- Create sequence coll_config_id_seq
CREATE SEQUENCE public.coll_config_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_config_id_seq
-- DROP SEQUENCE public.coll_config_id_seq;

-- Set ownership of coll_config_id_seq
ALTER SEQUENCE public.coll_config_id_seq OWNED BY public.coll_config.id;

-- Create table coll_documents_types
CREATE TABLE public.coll_documents_types (
    id bigint NOT NULL,
    name character varying(2044),
    name_short character varying(2044),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_documents_types
-- DROP TABLE public.coll_documents_types;

-- Create sequence coll_documents_type_id_seq
CREATE SEQUENCE public.coll_documents_type_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_documents_type_id_seq
-- DROP SEQUENCE public.coll_documents_type_id_seq;

-- Set ownership of coll_documents_type_id_seq
ALTER SEQUENCE public.coll_documents_type_id_seq OWNED BY public.coll_documents_types.id;

-- Create table coll_eps
CREATE TABLE public.coll_eps (
    id bigint NOT NULL,
    name character varying(2044),
    description character varying(2044),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_eps
-- DROP TABLE public.coll_eps;

-- Create sequence coll_ep_id_seq
CREATE SEQUENCE public.coll_ep_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_ep_id_seq
-- DROP SEQUENCE public.coll_ep_id_seq;

-- Set ownership of coll_ep_id_seq
ALTER SEQUENCE public.coll_ep_id_seq OWNED BY public.coll_eps.id;

-- Create table coll_especialista
CREATE TABLE public.coll_especialista (
    id bigint NOT NULL,
    nombre_primero character varying(2044),
    nombre_segundo character varying(2044),
    apellido_primero character varying(2044),
    apellido_segundo character varying(2044),
    documento_numero character varying(2044),
    id_documento_tipo bigint NOT NULL,
    id_especialidad_tipo bigint NOT NULL,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_especialista
-- DROP TABLE public.coll_especialista;

-- Create sequence coll_especialista_id_documento_tipo_seq
CREATE SEQUENCE public.coll_especialista_id_documento_tipo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_especialista_id_documento_tipo_seq
-- DROP SEQUENCE public.coll_especialista_id_documento_tipo_seq;

-- Set ownership of coll_especialista_id_documento_tipo_seq
ALTER SEQUENCE public.coll_especialista_id_documento_tipo_seq OWNED BY public.coll_especialista.id_documento_tipo;

-- Create sequence coll_especialista_id_especialidad_tipo_seq
CREATE SEQUENCE public.coll_especialista_id_especialidad_tipo_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_especialista_id_especialidad_tipo_seq
-- DROP SEQUENCE public.coll_especialista_id_especialidad_tipo_seq;

-- Set ownership of coll_especialista_id_especialidad_tipo_seq
ALTER SEQUENCE public.coll_especialista_id_especialidad_tipo_seq OWNED BY public.coll_especialista.id_especialidad_tipo;

-- Create sequence coll_especialista_id_seq
CREATE SEQUENCE public.coll_especialista_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_especialista_id_seq
-- DROP SEQUENCE public.coll_especialista_id_seq;

-- Set ownership of coll_especialista_id_seq
ALTER SEQUENCE public.coll_especialista_id_seq OWNED BY public.coll_especialista.id;

-- Create table coll_especialistas_horarios
CREATE TABLE public.coll_especialistas_horarios (
    id bigint NOT NULL,
    id_especialista bigint,
    fecha date,
    hora_inicio time with time zone,
    hora_fin time with time zone,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_especialistas_horarios
-- DROP TABLE public.coll_especialistas_horarios;

-- Create sequence coll_especialistas_horario_id_seq
CREATE SEQUENCE public.coll_especialistas_horario_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_especialistas_horario_id_seq
-- DROP SEQUENCE public.coll_especialistas_horario_id_seq;

-- Set ownership of coll_especialistas_horario_id_seq
ALTER SEQUENCE public.coll_especialistas_horario_id_seq OWNED BY public.coll_especialistas_horarios.id;

-- Create table coll_patients
CREATE TABLE public.coll_patients (
    id bigint NOT NULL,
    "id_documentoType" bigint,
    documento character varying(2044),
    nombre_primero character varying(2044),
    nombre_segundo character varying(2044),
    apellido_primero character varying(2044),
    apellido_segundo character varying(2044),
    fecha_nacimiento date,
    email character varying(2044),
    numero_contacto character varying(2044),
    pais character varying(2044),
    ciudad character varying(2044),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_patients
-- DROP TABLE public.coll_patients;

-- Create sequence coll_patient_id_seq
CREATE SEQUENCE public.coll_patient_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_patient_id_seq
-- DROP SEQUENCE public.coll_patient_id_seq;

-- Set ownership of coll_patient_id_seq
ALTER SEQUENCE public.coll_patient_id_seq OWNED BY public.coll_patients.id;

-- Create table coll_specialties
CREATE TABLE public.coll_specialties (
    id bigint NOT NULL,
    name character varying(2044),
    description character varying(2044),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_specialties
-- DROP TABLE public.coll_specialties;

-- Create sequence coll_specialtie_id_seq
CREATE SEQUENCE public.coll_specialtie_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_specialtie_id_seq
-- DROP SEQUENCE public.coll_specialtie_id_seq;

-- Set ownership of coll_specialtie_id_seq
ALTER SEQUENCE public.coll_specialtie_id_seq OWNED BY public.coll_specialties.id;

-- Create table coll_sugerencias
CREATE TABLE public.coll_sugerencias (
    id bigint NOT NULL,
    description character varying(2044),
    fecha timestamp with time zone,
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_sugerencias
-- DROP TABLE public.coll_sugerencias;

-- Create sequence coll_sugerencias_id_seq
CREATE SEQUENCE public.coll_sugerencias_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_sugerencias_id_seq
-- DROP SEQUENCE public.coll_sugerencias_id_seq;

-- Set ownership of coll_sugerencias_id_seq
ALTER SEQUENCE public.coll_sugerencias_id_seq OWNED BY public.coll_sugerencias.id;

-- Create table coll_users
CREATE TABLE public.coll_users (
    id bigint NOT NULL,
    nombre_primero character varying(2044),
    nombre_segundo character varying(2044),
    apellido_primero character varying(2044),
    apellido_segundo character varying(2044),
    email character varying(2044),
    password character varying(2044),
    "id_documentoType" bigint,
    documento_numero character varying(2044),
    "createdAt" timestamp with time zone,
    "updatedAt" timestamp with time zone
);

-- Drop table coll_users
-- DROP TABLE public.coll_users;

-- Create sequence coll_user_id_seq
CREATE SEQUENCE public.coll_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

-- Drop sequence coll_user_id_seq
-- DROP SEQUENCE public.coll_user_id_seq;

-- Set ownership of coll_user_id_seq
ALTER SEQUENCE public.coll_user_id_seq OWNED BY public.coll_users.id;

-- Insert data into coll_especialistas_horarios
INSERT INTO public.coll_especialistas_horarios VALUES (1, 1, NULL, NULL, NULL, NULL, NULL);

-- Add primary key constraint to coll_users
ALTER TABLE ONLY public.coll_users
    ADD CONSTRAINT coll_users_pkey PRIMARY KEY (id);

-- Drop primary key constraint from coll_users
-- ALTER TABLE ONLY public.coll_users DROP CONSTRAINT coll_users_pkey;
