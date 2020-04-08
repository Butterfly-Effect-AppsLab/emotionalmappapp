import setuptools


setuptools.setup(
    name="app-backend", # Replace with your own username
    version="0.0.1",
    author="Sebastian Vanik",
    author_email="sebastian.vanik@gmail.com",
    description="A small example package",
    long_description="long_description",
    long_description_content_type="text/markdown",
    packages=setuptools.find_packages(),
    classifiers=[
        "Programming Language :: Python :: 3",
        "License :: OSI Approved :: MIT License",
        "Operating System :: OS Independent",
    ],
    python_requires='>=3.6',
)